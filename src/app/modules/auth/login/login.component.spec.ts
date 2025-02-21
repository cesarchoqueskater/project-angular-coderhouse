import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('LoginComponent', () => {
    let loginComponent: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [SharedModule],
        }).compileComponents();

        loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
    });

    it('Should instance login.component', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        // ni null, ni undefined ni 0...
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('Email and password it is needed', () => {
        expect(
            loginComponent.loginForm.get('email')?.hasValidator(Validators.required)
        ).toBe(true);
        expect(
            loginComponent.loginForm
                .get('password')
                ?.hasValidator(Validators.required)
        ).toBe(true);
    });

    it('If the form is invalid,the field show like touched', () => {
        loginComponent.loginForm.setValue({
            email: '',
            password: '',
        });

        const spyOnMarkAllAsTouched = spyOn(
            loginComponent.loginForm,
            'markAllAsTouched'
        );
        loginComponent.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1);
    });

    it('If the form is valid, call to login by AuthService', () => {
        loginComponent.loginForm.setValue({
            email: 'email@email.com',
            password: 'emailemail',
        });
        const spyOnLogin = spyOn((loginComponent as any).authService, 'login');
        loginComponent.onSubmit();
        expect(spyOnLogin).toHaveBeenCalledTimes(1);
    });
});