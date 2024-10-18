import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'

import React from 'react'
import { Toaster } from './components/ui/sonner.jsx'
import store, { persistor } from './redux/store.jsx'; 
import { PersistGate } from 'redux-persist/integration/react'




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    

  <PersistGate  persistor={persistor}>
      <App />
    </PersistGate>

   

 

  </Provider>
  
  <Toaster/>
 
</React.StrictMode>
)
