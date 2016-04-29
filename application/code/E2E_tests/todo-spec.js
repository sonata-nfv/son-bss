describe('SonataBSS', function() {

   beforeEach(function() {
    browser.get('http://localhost:1337');
  });

  
  it('title must be SonataBSS', function() {
    expect(browser.getTitle()).toEqual('SonataBSS');
  });
  
  it ('default url is NSDs',function(){
	expect (browser.getCurrentUrl()).toBe('http://localhost:1337/#/nSDs');
  });

  
  
describe('NSDs View', function() {  

  beforeEach(function() {
    browser.get('http://localhost:1337/#/NSDs');
  });

  
  it('services list must not be empty', function() {
	
	var count=element.all(by.repeater('nSD in nSDs')).count();
	expect(count).toBeGreaterThan(0);
  });

  it('when clicked: "service details" shows the service descriptor details' , function() {
	
	var el=element.all(by.css('.btn-success')).get(0);
	
	el.click();
	
	var tree_el=element(by.tagName('json-tree'));
	
	
	expect(tree_el.getAttribute('object')).toBe('currentNSD');
  });
  
  it('when clicked: "request service instantiation" instantiates a new service' , function() {
	
	var inst_el=element.all(by.css('.btn-danger')).get(0);
	
	inst_el.click();
	
	var parent = element(by.id('instantiateNSD'));
	var child = parent.element(by.binding('childBinding'));
	
	var yes_el=parent.element(by.css('.btn-success'));
	
	yes_el.click();
	browser.sleep(1500);

	expect(element(by.id('instantiateNSD')).isDisplayed()).toBe(false);
	
  });

  });
describe('Instantiation Requests View', function() {  

  beforeEach(function() {
    browser.get('http://localhost:1337/#/InstantiationRequests');
  });

  
  it('instantiation requests list must not be empty', function() {
	
	var count=element.all(by.repeater('iR in InstantiationRequests')).count();
	expect(count).toBeGreaterThan(0);
  });

  it('when clicked: "request details" shows the instantiation request details' , function() {
	
	var el=element.all(by.css('.btn-success')).get(0);
	
	el.click();
	
	var tree_el=element(by.tagName('json-tree'));
	
	
	expect(tree_el.getAttribute('object')).toBe('currentInstantiationRequests');
  });

});  
  


});
