import Product from './product';
import UserInfo from './userInfo';

export default class Lot {
    id: number;
    product: Product;
    biddingEnd: string;
    actualPrice: Number;
    winner: UserInfo;
}
