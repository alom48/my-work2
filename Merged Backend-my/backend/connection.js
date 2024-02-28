const conn1 = mongoose.createConnection("mongodb+srv://Arnob:bonrA@techweb.6zzxtnh.mongodb.net/?retryWrites=true&w=majority",{dbName:'Job_Data'});
const conn2 = mongoose.createConnection("mongodb+srv://bodrul1:bodrul12345@techweb.6zzxtnh.mongodb.net/productpage?retryWrites=true&w=majority")

module.exports={
    conn1,
    conn2
}