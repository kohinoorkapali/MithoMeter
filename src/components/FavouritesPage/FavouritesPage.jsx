import { Header } from "../Header";
import { RestaurantCard } from '../BrowsePage/RestaurantCard.jsx';
import './FavouritesPage.css'

export function FavouritesPage(){
    return(
        <>
            <Header/>
            <div className="favourites-container">
                    <RestaurantCard/>

            </div>
        </>
    );
}