const req = require('express/lib/request');
const Order=require('../model/ordermodel');

exports.orderPlace=(request,response)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    Order.create({
        userId:request.body.userId,
        productId:request.body.productId,
        shippingAddress:request.body.shippingAddress,
        mobileNo:request.body.mobileNo,
        orderQuantity:request.body.orderQuantity,
        totalAmount:request.body.totalAmount,
        orderDate:date,
        orderStatus:"ordered"
    })  
    .then(result=>{
        return response.status(200).json(result);
    })  
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.viewOrders=(request,response)=>{
    Order.find().populate("productId")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};


//particular user orders History
exports.userOrderHistory=(request,response)=>{
    Order.find({orderStatus:"delivered",userId:request.params.id})
    .populate("productId")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//particular user orders Track
exports.userOrderTrack=(request,response)=>{
    Order.find({orderStatus:"ordered",userId:request.params.id})
    .populate("productId")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//all orders for admin
exports.allOrders=(request,response)=>{
    Order.find({orderStatus:"ordered"})
    .populate("productId")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//all orders history for admin 
exports.allOrdersHistory=(request,response)=>{
    Order.find({orderStatus:"delivered"})
    .populate("productId")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.orderStatus=(request,response)=>{
    Order.updateOne({_id:request.params.orderId},
        {
            $set:
            {
                orderStatus:"delivered"
            }
        }    
    )
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};  