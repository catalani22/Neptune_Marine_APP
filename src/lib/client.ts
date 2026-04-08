import { supabase } from './supabase';
import type { Vessel, SourceRule } from '../types';

// List vessels from Supabase
export async function listVessels(params?: {
  type?: string;
  source?: string;
  region?: string;
}): Promise<Vessel[]> {
  let query = supabase
    .from('vessels')
    .select('*')
    .order('created_at', { ascending: false });

  if (params?.type) {
    query = query.eq('type', params.type);
  }
  if (params?.source) {
    query = query.eq('source', params.source);
  }
  if (params?.region) {
    query = query.eq('region', params.region);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// Get vessel by slug
export async function getVessel(slug: string): Promise<Vessel | null> {
  const { data, error } = await supabase
    .from('vessels')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

// Get source rules
export async function getSourceRules(source: string): Promise<SourceRule | null> {
  const { data, error } = await supabase
    .from('source_rules')
    .select('*')
    .eq('source', source)
    .single();
  
  if (error) throw error;
  return data;
}

// Get site config
export async function getSiteConfig(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .limit(1)
    .single();
  
  if (error) throw error;
  return data;
}
