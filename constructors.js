/**
 * Creates a generic spell that can be cast.
 *
 * @name Spell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {string} description
 * @method   printDetails
 */


function Spell(name,cost,description){
  this.name = name;
  this.cost = cost;
  this.description = description;
  this.printDetails = function(){
    console.log('name: '+this.name+' cost: '+this.cost+' description: '+this.description);
  }
}

  /**
   * @method printDetails
   *
   * Print out all spell details and format it nicely.
   * The format doesnt matter, as long as it contains the spell name, cost, and description.
   *
   * note: using comma separated arguments for console.log() will not satisfy the tests
   * e.g. console.log(a, b, c); <-- no commas, please use string concatenation.
   */

function DamageSpell(name,cost,damage,description){
  Spell.call(this,name,cost,description);
  this.damage = damage;
};
DamageSpell.prototype = Object.create(Spell.prototype,{constructor :{value:Spell}});

/**
 * A spell that deals damage.
 * We want to keep this code DRY (Don't Repeat Yourself).
 *
 * So you should use `Spell.call()` to assign the spell name, cost, and description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * In addition, you will also want to assign `DamageSpell.prototype`
 * a value so that it inherits from `Spell`.
 * Make sure to call this OUTSIDE of the function declaration.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 *
 * @name DamageSpell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {number} damage       The amount of damage this spell deals.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {string} description
 */
function Spellcaster(name,health,mana){
  this.name = name;
  this.health = health;
  this.mana = mana;
  this.isAlive = true;
  this.inflictDamage = function(damage){
    this.health -= damage;
    if(this.health <= 0){
      this.isAlive = false;
      this.health = 0;
    }
  };
  this.spendMana = function(cost){
    if(this.mana >= cost){
      this.mana -= cost;
      return true;
    } else return false;
  };
  this.invoke = function(spell,target){
    if(spell instanceof Spell && spell instanceof DamageSpell &&  target instanceof Spellcaster){
      if(this.mana >= spell.cost){
        this.spendMana(spell.cost);
        target.inflictDamage(spell.damage);
        return true;
      } else return false;
    } else if(spell instanceof Spell && !(spell instanceof DamageSpell)){
      if(this.mana >= spell.cost){
        this.spendMana(spell.cost);
        return true
      } else return false;
    } else return false;
  };
}


  /**
   * @method invoke
   *
   * Allows the spellcaster to cast spells.
   * The first parameter should either be a `Spell` or `DamageSpell`.
   * If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
   * The function should return `false` if the above conditions are not satisfied.
   *
   * You should use `instanceof` to check for these conditions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
   *
   * Next check if the spellcaster has enough mana to cast the spell.
   * If it can cast a spell, it should lose mana  equal to the spell's cost.
   * If there is not enough mana, return `false`.
   *
   * If there is enough mana to cast the spell, return `true`.
   * In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.
   *
   * Use functions you've previously created: (`inflictDamage`, `spendMana`)
   * to help you with this.
   *
   * @param  {(Spell|DamageSpell)} spell  The spell to be cast.
   * @param  {Spellcaster} target         The spell target to be inflicted.
   * @return {boolean}                    Whether the spell was successfully cast.
   */
