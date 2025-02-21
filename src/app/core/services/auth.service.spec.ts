import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

describe('AuthService', () => {
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService, MockProvider(Router)],
        }).compileComponents();

        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('AuthService should be instantiated', () => {
        expect(authService).toBeTruthy();
    });

    it('Login succesfull , you must set the authenticated user, you must set the access token in localStorage, you must redirect to home', () => {
        const spyOnNavigate = spyOn(router, 'navigate');

        authService.login({
            email: 'admin@gmail.com',
            password: 'adminnadmin',
        });
        
        /*
         email: 'admin@gmail.com',
         password: 'adminnadmin',
        */


        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(localStorage.getItem('access_token')).toBeTruthy();
                expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
            },
        });
    });
});