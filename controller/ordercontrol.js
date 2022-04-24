const req = require('express/lib/request');
const Order=require('../model/ordermodel');
const Cart=require('../model/cartmodel')
const Razorpay = require('razorpay')
var instance = new Razorpay({ key_id: 'rzp_test_QoaC9eX0D7fVFo', key_secret: 'HIEAPWoXrALXhWqD8mlaitYE' })

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
        orderStatus:"ordered",
        orderPayment: request.body.orderPayment
    })  
    .then(result=>{
        Cart.updateOne({_id:request.body.userId},
            {
                $set:{productId:[]}
            }    
        )
        .then(result => {
            return response.status(200).json({msg:"Your Order Is Placed... And Cart Is Empty...."});
        })
        .catch(err => {
            return response.status(500).json(err);
        });
        return response.status(200).json(result);
    })  
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.viewOrders=(request,response)=>{
    Order.find().populate("productId").populate("userId")
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
    .populate("productId").populate("userId")
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
    .populate("productId").populate("userId")
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
    .populate("productId").populate("userId")
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
    .populate("productId").populate("userId")
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




exports.onlinepay=(request,response)=>{


    console.log(request.body)
    
instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2"
    }
  },(err,order)=>{
      console.log(err)
      console.log(order)
      response.json(order)
  })


}

