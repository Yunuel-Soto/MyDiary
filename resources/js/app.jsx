import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout/Layout';
// import { InertiaProgress } from '@inertiajs/progress';

createInertiaApp({
  title: title => `${title} - My diary`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page = pages[`./Pages/${name}.jsx`];
    page.default.layout = page.default.layout || ((page) => <Layout children={page}/>);
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },

  progress: {
    color: 'rgb(160, 81, 233)',
    showSpinner: false,
  }

})
