module.exports = (app) => {
  app.use((req , res , next) => {
    res.status(404).send({
      status: false ,
      code: 'url not found' ,
      msg: 'آدرس مورد نظر یافت نشد' ,
      detail: {
        url_requested: req.baseUrl + req.url
      }
    })
  })
}
