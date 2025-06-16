import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { RequestStatus } from '@store/model';

export type RequestStatusState = { requestStatus: RequestStatus };

export function setPending(): RequestStatusState {
    return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
    return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
    return { requestStatus: { error } };
}

export function withRequestStatus() {
    return signalStoreFeature(
        withState<RequestStatusState>({ requestStatus: 'idle' }),
        withComputed(({ requestStatus }) => ({
            isPending: computed(() => requestStatus() === 'pending'),
            isFulfilled: computed(() => requestStatus() === 'fulfilled'),
            error: computed(() => {
                const status = requestStatus();
                return typeof status === 'object' ? status.error : null;
            }),
        }))
    );
}
