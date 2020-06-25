import { ServerRespond } from './DataStreamer';

/*changed interface row  by add new value(property) and remove some value*/

export interface Row {
 price_abc:number,
 price_def:number,
 ratio:number,
 timestamp: Date,
 upper_bound: number,
 lower_bound: number,
 trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    
    /* calculate the price of trade , ratio, upperbound,lowerboud*/
    
    const priceABC=(serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
    const priceDEF=(serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
    const ratio=priceABC/priceDEF;
    const upperbound=1+0.05;
    const lowerbound=1-0.05;
    
    /* assign greater timestamp */

    const timestamp=serverResponds[0].timestamp > serverResponds[1].timestamp ?serverResponds[0].timestamp:serverResponds[1].timestamp;
    
    /* assign ratio value to triggeralert if the ratio between lowerbound and upperbound alse assign undefined*/

    const triggeralert=(ratio >upperbound || ratio<lowerbound ) ? ratio:undefined;
    
    /*return the data to graph componentDidUpdate function*/

    return {price_abc:priceABC,
        price_def:priceDEF,
        ratio:ratio,
        timestamp:timestamp,
        upper_bound:upperbound,
        lower_bound :lowerbound,
        trigger_alert:triggeralert,
      };
    
  }
}
