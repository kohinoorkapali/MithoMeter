import './AdminDashboard.css'
import { Analytics } from './ViewAnalytics/Analytics.jsx';
import ViewReview from './ViewReview/ViewReview.jsx';
import ViewUser from './ViewUser/ViewUser.jsx';

import { Header } from '../Header.jsx';


export default function AdminDashboard(){
    return(
        <div classname ="dashboard-page">
        <Header role = "admin"/>
        <div className='dashboard-container'>
            <Analytics/>
            <div className='user-report'>
                <ViewUser/>
                <ViewReview/>
            </div>

        </div>
        
        </div>
    );
}