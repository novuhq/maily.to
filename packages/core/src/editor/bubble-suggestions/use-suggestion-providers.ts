import { Editor } from '@tiptap/core';
import { useMemo } from 'react';
import {
  getSuggestionProviders,
  detectActiveProvider,
  findMatchingProvider,
} from './suggestion-registry';
import { SuggestionProvider, SuggestionContext } from './suggestion-provider';

export function useSuggestionProviders(
  editor: Editor,
  enabledProviders?: string[]
) {
  return useMemo(() => {
    return getSuggestionProviders(editor, enabledProviders);
  }, [editor, enabledProviders]);
}

export function useActiveSuggestion(
  value: string,
  providers: SuggestionProvider[]
): SuggestionContext | null {
  return useMemo(() => {
    return detectActiveProvider(value, providers);
  }, [value, providers]);
}

export function useMatchingProvider(
  value: string,
  providers: SuggestionProvider[]
): SuggestionProvider | null {
  return useMemo(() => {
    return findMatchingProvider(value, providers);
  }, [value, providers]);
}
