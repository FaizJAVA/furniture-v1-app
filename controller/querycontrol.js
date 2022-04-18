const Query=require('../model/querymodel');

exports.query=(request,response)=>{
    Query.create({
        userId: request.body.userId,
        query: request.body.query,
        status:false
    })
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.view=(request,response)=>{
    Query.find()
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.removeQuery=(request,response)=>{
    Query.deleteOne({_id:request.params.id})
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};