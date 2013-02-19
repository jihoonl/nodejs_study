
// returns object info as a string
function concatObject(obj) {
  var str='';

  if(typeof(obj) == "string")
    return obj;

  for(prop in obj) {
    str += prop + " : ";
                      
  if (typeof(obj[prop]) == "object") 
    str += concatObject(obj[prop]) + "\n";
  else
    str += "[ " + obj[prop] + "] ";
  }
  return(str);
}

