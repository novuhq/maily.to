// Core types and interfaces
export type {
  SuggestionItem,
  SuggestionProvider,
  SuggestionContext,
  SuggestionProviderFactory,
} from './suggestion-provider';

// Registry functions
export {
  registerSuggestionProvider,
  getSuggestionProviders,
  detectActiveProvider,
  findMatchingProvider,
} from './suggestion-registry';

// React hooks
export {
  useSuggestionProviders,
  useActiveSuggestion,
  useMatchingProvider,
} from './use-suggestion-providers';

// Components
export { SuggestionInput } from './suggestion-input';
