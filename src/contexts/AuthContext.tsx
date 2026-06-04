import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, UserRole } from '../lib/supabase';
interface AppUser { id:string; email:string; full_name:string; avatar_id:string; role:UserRole; house?:string; xp:number; level:number; created_at:string; }
import { getLevelFromXP } from '../utils/mathEngine';

interface AuthContextValue {
  session: Session | null;
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<AuthError | null>;
  signUpWithEmail: (email: string, password: string, fullName: string, role: UserRole, avatarId: string, house?: string) => Promise<AuthError | null>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AppUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

async function fetchAppUser(supabaseUser: User): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', supabaseUser.id).single();
  if (error || !data) return null;
  return { ...data, level: getLevelFromXP(data.xp ?? 0) } as AppUser;
}

/** Only called on first sign-up — never overwrites existing data */
async function createProfileIfMissing(supabaseUser: User, extra?: Partial<AppUser>): Promise<AppUser | null> {
  // Try to fetch first — profile may already exist
  const existing = await fetchAppUser(supabaseUser);
  if (existing) return existing;

  // Create new profile
  const newProfile = {
    id:         supabaseUser.id,
    email:      supabaseUser.email ?? '',
    full_name:  extra?.full_name ?? supabaseUser.user_metadata?.full_name ?? supabaseUser.email?.split('@')[0] ?? 'Player',
    avatar_id:  extra?.avatar_id ?? '0',
    role:       extra?.role ?? ('student' as UserRole),
    house:      extra?.house ?? null,
    xp:         0,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('profiles').insert(newProfile).select().single();
  if (error) { console.error('createProfile error', error); return null; }
  return { ...data, level: getLevelFromXP(0) } as AppUser;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user,    setUser]    = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    if (s?.user) { const u = await fetchAppUser(s.user); setUser(u); }
  }, []);

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) { const u = await fetchAppUser(s.user); setUser(u); }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      if (s?.user) {
        if (event === 'SIGNED_IN') {
          // Google OAuth — create profile if first time
          const u = await createProfileIfMissing(s.user);
          setUser(u);
        } else {
          // TOKEN_REFRESHED, INITIAL_SESSION etc — just fetch
          const u = await fetchAppUser(s.user);
          setUser(u);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/`, queryParams: { access_type: 'offline', prompt: 'consent' } },
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) { await refreshUser(); }
    return error;
  };

  const signUpWithEmail = async (
    email: string, password: string, fullName: string,
    role: UserRole, avatarId: string, house?: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } },
    });
    if (error || !data.user) return error;
    // Create profile with all details immediately
    await createProfileIfMissing(data.user, {
      full_name: fullName, role, avatar_id: avatarId,
      house: house as AppUser['house'],
    });
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); setSession(null);
  };

  /** Update profile fields — persists to Supabase */
  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!session?.user) return;
    const { data } = await supabase
      .from('profiles').update(updates).eq('id', session.user.id).select().single();
    if (data) setUser({ ...data, level: getLevelFromXP(data.xp ?? 0) } as AppUser);
  };

  return (
    <AuthContext.Provider value={{
      session, user, loading,
      signInWithGoogle, signInWithEmail, signUpWithEmail,
      signOut, updateProfile, refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
