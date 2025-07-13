/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',  
        secondary: '#10B981',     
        text: {
          primary: '#374151',    
          secondary: '#6B7280',   
        },
        background: {
          light: '#F3F4F6',       
        },
        error: '#EF4444',        
        white: '#FFFFFF',
      },
      fontFamily: {
        title: ['Poppins-Bold'],
        subtitle: ['Poppins-SemiBold'],
        body: ['Poppins-Regular'],
      },
      fontWeight: {
        title: '700',
        subtitle: '600',
        body: '400',
      },
      fontSize: {
        title: ['24px'],     
        subtitle: ['16px'],  
        body: ['18px'],     
      },
    },
  },
  plugins: [],
};
