import Debug "mo:base/Debug";
actor DBank{ 
  var currentValue = 0;
  //currentValue := 100; // := this is used to replace the value of a variable 

  public func deposit( funds : Nat ) {
    currentValue := funds;
    Debug.print(debug_show(currentValue));
  };
  public func topUp(amount : Nat) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawal(amount : Nat) {
    let tempValue : Int = currentValue - amount;
    if (tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }
    else{
      Debug.print("The value inputted is larger than the current balance.")
    }
    
  };

}