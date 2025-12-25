import { Header } from '../Header.jsx';
import './AdminDashboard.css'
import { Analytics } from './ViewAnalytics/Analytics.jsx';

export function AdminDashboard(){
    return(
        <>
        <Header role = "admin"/>
        <div className='dashboard-container'>
            <Analytics/>
        </div>
        
        </>
    );
}