# 面向对象的Javascript程序设计
* 先做如下封装：将人看作一个对象，它具有“姓名”和“编号”两个属性：
```javascript
var People = { 
	name: '', 
	id: '' 
}
```
* 根据上面的对象原型，我们可以生成两个实例对象：
```javascript
var people1 = {};
people1.name = '小何';
people1.id = '001';
var people2 = {};
people2.name = '小马';
people2.id = '002';
```
* 以上就是最简单的封装了，把两个属性封装在一个对象里面。但是却存在明显缺点：
1. 生成的对象越多，编写越麻烦；
2. 原型与实例之间的关系不明确。
* 对于编写麻烦的缺点我们可以增加一个函数来解决，函数实现如下：
```javascript
var People = function (name, id){
	return {
		name : name,
		id : id
	}
}
```
* 调用此函数就可以生成实例对象，如下：
```javascript
var people1 = People('小何', '001');
var people2 = People('小马', '002');
```
* 但是这样改变后依然存在“原型与实例之间关系不明确”的问题。为了解决从原型对象生成实例的问题，JS提供了一个构造函数模式。该模型内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。如人的构造函数就能如下书写：
```javascript
var People = function (name, id){
	this.name = name;
	this.id = id;
}
```
* 据此生成实例对象：
```javascript
var people1 = new People('小何', '001');
var people2 = new People('小马', '002');
```
* 这时people1和people2会自动含有一个constructor属性，指向它们的构造函数：
```javascript
alert(people1.constructor == People); //true
alert(people2.constructor == People); //true
```
* JS还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系：
```javascript
alert(people1 instanceof People); //true
alert(people2 instanceof People); //true
```
* 构造函数模式虽然好，但是却存在一个浪费内存的问题。如现在我们为“人”添加一个不会改变的“种类”属性和一个“吃”方法：
```javascript
var People = function (name, id){
	this.name = name;
	this.id = id;
	this.type = '生物';
	this.eat = function(){
		alert('正在吃饭。');
	}
}
```
* 然后采用同样的方法生成实例对象：
```javascript
var people1 = new People('小何', '001');
var people2 = new People('小马', '002');
alert(people1.type); //生物
people2.eat(); //正在吃饭。
```
* 表面上似乎没什么问题，然而仔细分析可以得知：在每个实例中新添加的“种类”和“吃”都是一模一样的内容，每次实例化对象时都会为相同的内容再分配一块内存。那我们可不可以将相同的部分提取出来，放到指定内存，然后每个对象都指向该内存呢？JS规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上：
```javascript
var People = function (name, id){
	this.name = name;
	this.id = id;
}
People.prototype.type = '生物';
People.prototype.eat = function(){
	alert('正在吃饭。');
}
```
* 然后采用同样的方法生成实例对象：
```javascript
var people1 = new People('小何', '001');
var people2 = new People('小马', '002');
alert(people1.type); //生物
people2.eat(); //正在吃饭。
```
* 这时所有实例的相同部分就都是同一个内存地址，指向prototype对象，因此就提高了运行效率：
```javascript
alert(people1.eat == people2.eat); //true
```
* 为了更好地使用prototype对象，JS还提供了一些辅助方法：
1. isPrototypeOf()——用来判断某个proptotype对象和某个实例之间的关系。
2. hasOwnProperty()——用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
3. in——用来判断某个实例是否含有某个属性，不管是不是本地属性；遍历某个对象的所有属性。 
```javascript
alert(People.prototype.isPrototypeOf(people1)); //true
alert(People.prototype.isPrototypeOf(people2)); //true

alert(people1.hasOwnProperty("name")); // true
alert(people1.hasOwnProperty("type")); // false

alert("name" in people1); // true
alert("type" in people1); // true

for(var prop in people1) { 
	alert('people1[' + prop + '] = ' + people1[prop]);
}
```
