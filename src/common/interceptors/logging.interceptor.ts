import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Clonamos el body y ocultamos la contraseña si existe
    const safeBody = { ...req.body };
    if (safeBody.password) {
      safeBody.password = '***hidden***';
    }
    console.log('--- REQUEST ---');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log('Body:', req.body);

    return next.handle().pipe(
      tap((data) => {
        // Clonamos la respuesta y ocultamos la contraseña si existe
        const safeResponse = { ...data };
        if (safeResponse && safeResponse.password) {
          safeResponse.password = '***hidden***';
        }
        console.log('--- RESPONSE ---');
        console.log('Body:', safeResponse);
      }),
    );
  }
}
