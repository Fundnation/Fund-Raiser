const connect = async ()=>{
  await  window.ic.plug.requestConnect();
  return window.ic
}

export default connect