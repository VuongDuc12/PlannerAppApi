/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Đây là nơi bạn sẽ cấu hình để Tailwind quét các file của bạn
    // để tìm các class Tailwind đang được sử dụng.
    // Mặc định, nó thường đã có dòng này:
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Dòng này rất quan trọng cho React/TypeScript
  ],
  theme: {
    extend: {
      // Bạn có thể mở rộng theme của Tailwind ở đây (ví dụ: thêm màu sắc, font, v.v.)
    },
  },
  plugins: [
    // Thêm các plugin của Tailwind vào đây nếu bạn muốn
  ],
}