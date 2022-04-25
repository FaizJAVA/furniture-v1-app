const Emi=require('../model/emimodel');

exports.emiEntry=(request,response)=>{
    var totalWithInterest=(request.body.emiTotal*request.body.emiIntrest)/100;
    totalWithInterest=request.body.emiTotal+totalWithInterest;

    var installments=totalWithInterest/10;

    var emiRemaining=totalWithInterest-(request.body.emiDownPayment);


    Emi.create({
        userId:request.body.userId,
        products:request.body.products,
        emiInstallment:installments,
        emiMonth:10,
        emiIntrest:request.body.emiIntrest,
        emiTotal:request.body.emiTotal,
        emiTotalWithIntresr:totalWithInterest,
        emiDownPayment: request.body.emiDownPayment,
        emiRemaining:emiRemaining
    })
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//all emi for admin
exports.adminAllEmi=(request,response)=>{
    Emi.find({emiMonth:{$gt:0}})
    .populate("userId")
    .populate("products")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//all emi history for addmin
exports.adminHistoryEmi=(request,response)=>{
    Emi.find({emiMonth:0})
    .populate("userId")
    .populate("products")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};


//emi history for particular user 
exports.userHistoryEmi=(request,response)=>{
    Emi.find({emiMonth:0,userId:request.body.id})
    .populate("userId")
    .populate("products")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

//emi for user particular user
exports.userEmi=(request,response)=>{
    Emi.find({emiMonth:{$gt:0},userId:request.body.id})
    .populate("userId")
    .populate("products")
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.emiUpdate=(request,response)=>{
    Emi.findOne({userId:request.params.id})
    .then(result=>{
        Emi.updateOne({userId:request.params.id},
            {
                $set:
                {
                    emiMonth: result.emiMonth-1,
                    emiRemaining:result.emiRemaining-result.emiInstallment
                }
            }    
        )
        .then(result=>{
            return response.status(200).json(result);
        })
        .catch(err=>{
            return response.status(500).json(err);
        });
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
    
};