/**
 * Flow Types
 * Shared types for state machines
 */

export interface FlowState<TStep extends string, TContext = any> {
    current: TStep;
    context: TContext;
    history: TStep[];
}

export interface FlowEvent<TType extends string = string, TPayload = any> {
    type: TType;
    payload?: TPayload;
}

export type FlowReducer<TState, TEvent> = (state: TState, event: TEvent) => TState;
