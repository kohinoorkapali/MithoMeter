import { Header } from "../Header";
import { RestaurantCard } from '../../commonRestaurantCard.jsx';
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