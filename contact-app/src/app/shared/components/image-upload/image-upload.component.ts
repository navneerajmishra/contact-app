import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ca-image-upload',
    imports: [],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent implements ControlValueAccessor {
    imageUrl: string | null = null;
    disabled = false;

    private onChange: (_: File | null) => void = () => {};
    private onTouched: () => void = () => {};

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
            this.onChange(file);
        } else {
            this.imageUrl = null;
            this.onChange(null);
        }

        this.onTouched();
    }

    writeValue(value: File | null): void {
        if (value && value.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageUrl = reader.result as string;
            };
            reader.readAsDataURL(value);
        } else {
            this.imageUrl = null;
        }
    }

    registerOnChange(fn: (_: File | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
