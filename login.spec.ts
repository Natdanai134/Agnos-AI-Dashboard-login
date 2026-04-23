import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

// กลุ่มของการทดสอบระบบ Login
test.describe('Login Functionality', () => {
  
  test('TC01 - Login with valid credentials', async ({ page }) => {
    // สร้าง Instance ของ LoginPage
    const loginPage = new LoginPage(page);

    // ขั้นตอนการทดสอบ
    await loginPage.navigate();
    await loginPage.login('test@gmail.com', '12345');
    
    // ตรวจสอบผลลัพธ์ (Assertion)
    await loginPage.verifyLoginSuccess();
  });

});