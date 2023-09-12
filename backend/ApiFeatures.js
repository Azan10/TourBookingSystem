class ApiFeatures{
  
    constructor(query,queryParam)
{
    this.query=query,
    this.queryParam=queryParam

}

field()
{
    if(this.queryParam.field){

      this.query=this.query.select(this.queryParam.field)
    }
    return this
}

   
sort()
{
    if(this.queryParam.sort){
        const sortBy=this.queryParam.sort.split(",").join('')
        this.query=this.query.sort(sortBy)
    }
    return this
}

}

module.exports=ApiFeatures