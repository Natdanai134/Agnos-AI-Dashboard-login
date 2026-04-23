
import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    // ใช้ URL นี้ตามที่คุณตั้งค่าไว้ล่าสุด
    await this.page.goto('https://dev.app.agnoshealth.com/ai_dashboard/login/');
  }

  async login(email: string, pass: string) {
    // --- ส่วนที่เพิ่ม/แก้ไขเริ่มตรงนี้ ---
    
    // 1. รอให้ช่องกรอกข้อมูลปรากฏขึ้นมาก่อน (ป้องกันปัญหาหน้าเว็บโหลดไม่ทัน)
    const usernameField = this.page.locator('input[name="username"]');
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });

    // 2. กรอกข้อมูลโดยใช้ name="username" และ name="password"
    await usernameField.fill(email); 
    await this.page.locator('input[name="password"]').fill(pass);
    
    // 3. คลิกปุ่มที่มีคำว่า Log in
    await this.page.getByRole('button', { name: /Log in/i }).click();

    // --- ส่วนที่เพิ่ม/แก้ไขจบตรงนี้ ---
  }

  async verifyLoginSuccess() {
    // รอให้ URL เปลี่ยนเป็น dashboard ภายใน 10 วินาที
    await this.page.waitForURL(/.*ai_dashboard/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/.*ai_dashboard/);
  }
}