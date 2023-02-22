import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#fa541c',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '标题',
  pwa: false,
  menu: {
    locale: false,
  },
  logo: 'https://th.bing.com/th?id=OSK.1bccade414847de73e297d42c59a8ec9&w=117&h=82&c=7&o=6&dpr=2&pid=SANGAM',
  iconfontUrl: '',
};

export default Settings;
