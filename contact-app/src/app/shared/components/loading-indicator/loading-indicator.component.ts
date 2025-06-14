import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RequestStatus } from '../../../store/store/with-request-status';

@Component({
  selector: 'ca-loading-indicator',
  imports: [],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  readonly requestStatus = input.required<RequestStatus>();
}
