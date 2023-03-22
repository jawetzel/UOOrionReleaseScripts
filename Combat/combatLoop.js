//Author: Jawetzel
//Release Date: 11-07-2022
//Instructions:
//Choose profile to use using the line "var profile = profiles.JunkoSamp;" by changing out JunkoSamp to another profile name.
//All features can be turned on or off by commenting out lines using // before the line
//If you are going to heal friends or pets you need to add names to the SetHealFriendNames list.

//#include Combat/Timeouts.jsp 
//#include Combat/LootEvaluator.jsp
//#include Combat/Survival.jsp
//#include Combat/Loot.jsp


function CombatLoop(){

	var profiles = {
		
		Spawn: {
			useSpecial: true,
			useAttack: true,
			useRunToTarget: true,
		},
		
		allFeatures: {
			//chiv
			useEnemyOfOne: true,
			useDivineFury: true,
			useConsecrateWeapon: true,
			useChivHeal: true,
			useHealChivFriend: true,

			//combat
			useAttack: true,
			useSpecial: true,
			useBandages: true,
			useEnhancementPots: true,
			useRestorePotions: true,
			useHealFriend: true,
			useRearm: true,
			useRunToTarget: true,

			//Bushido
			useMomentumStrike: true,
			useLightningStrike: true,
			useHonor: true,
			useConfidence: true,
			useEvasion: true,
			
			//Looting
			useLootCorpses: true,
			useIgnoreReset: true,
			
			//Tamer
			useHealPets: true,
		}
	}
	
	
	var profile = profiles.Spawn;	
	
	UseLootEvalPassword("12345");

	//if you want to cut corpses get a butchers war cleaver
	//SetUseCutCorpses(true);
	
	//chiv settings
	var useEnemyOfOne = profile != null ? profile.useEnemyOfOne :  false;
	var useDivineFury = profile != null ? profile.useDivineFury :  false;
	var useConsecrateWeapon = profile != null ? profile.useConsecrateWeapon :  false;
	var useChivHeal =  profile != null ? profile.useChivHeal :  false;
	var useHealChivFriend =  profile != null ? profile.useHealChivFriend :  false;
	//combat settings
	var useSpecial = profile != null ? profile.useSpecial : false;
	var primaryArmorIgnoreWeapons = [
		'Bladed Staff',
		'Soul Glaive',
		'Composite Bow',
		'Boomerang',
		'Longsword',
		'Katana',
	];
	var secondaryArmorIgnoreWeapons = [
		
		'Leafblade',
		'Bokuto',
		'Yumi',
		'Broadsword'
	];
	var primaryWhirlwindWeapon = [
		'Radiant Scimitar',
		'Magical Shortbow'
	];
	var secondaryWhirlwindWeapon = [
		'Double Axe'
	];
				
				
	//ninja
	var useDeathStrike = profile != null ? profile.useDeathStrike :  false;
	//bushido settings
	var useMomentumStrike = profile != null ? profile.useMomentumStrike :  false;
	var useLightningStrike =profile != null ? profile.useLightningStrike :   false;
	var useHonor = profile != null ? profile.useHonor :  false;
	
	
	var useSkipTypesToIgnore =  profile != null ? profile.useSkipTypesToIgnore :  false;
	
	var useBandages =  profile != null ? profile.useBandages :  false;
	var useEnhancementPots =  profile != null ? profile.useEnhancementPots :  false;
	var useRestorePotions =  profile != null ? profile.useRestorePotions :  false;
	var healPotionThreshold = 25;
	var useHealFriend = profile != null ? profile.useHealFriend :  false;
	var useHealPets = profile != null ? profile.useHealPets :  false;
	var useConfidence =  profile != null ? profile.useConfidence :  false;
	var useEvasion = profile != null ? profile.useEvasion :  false;
	SetHealFriendThreshold(70);
	SetHealFriendNames([
		'[-G-]',
		'[NEW]'
	]);
		
	// probably dont configure below here
	var timeBetweenLoops = 500; //time in ms between loop cycle
	var enemyTypes = 'gray|criminal|enemy|red'			; // 'gray | criminal | enemy | red'
	var maxEnemyDistance =  8;
	var useAttack = profile != null ? profile.useAttack : false;
	var useRearm =  profile != null ? profile.useRearm : false;
	var useRunToTarget = profile != null ? profile.useRunToTarget : false;
	var MinDistToTarget = 1;
	var moveToBoundry = {
			//miny: 591,
			//maxy: 623
		}
	var humanoidNamesToAttack = [
		"Protector"
	];
	var minimumManaForSpells = 20;
	var useLootCorpses = profile != null ? profile.useLootCorpses :   false;
	var useIgnoreReset= profile != null ? profile.useIgnoreReset :   false;
	SetUseInsureItem(profile != null ? profile.useInsureItem :   false);
	SetUseLootTMaps(profile != null ? profile.useLootTMaps :   false);
	
	
	
	if(Orion.ShardName() === 'Siege Perilous'){
		Orion.Print('Using Siege Loot Table');
		SetLootItems({
			'0x400B': true, //shame crystals
			//'0x226F': true, //wraith form
			'0x573E': true, //void Orion
			'0x5728': true, //void core
			//'0x0E21': true, //bandages
			'0x0EED': true, // gold
			'0x0F3F': true, //arrows
			'0x1BD1': true, // feathers
			'0x26B7': true, //zoogi
			//lesser pots
			//'0x0F08': true, // agility pot
			//'0x0F09': true, //str pot
			//'0x0F0C': true, //heal pot
			//'0x0F07': true, //cure
			//'0x0F7D': true, //deamon Bloodd
			//'0x0F8A': true, //pig iron
			//'0x0F8E': true, //nox crystal 
			//'0x0F78': true, //batwing
			//'0x0F8F': true, // grave dist 
			'0x0F80': true, // demon bone
			'0x5747': true, //raptor teeth
			'0x571C': true, // essence achivement
			'0x5744': true, //SS skin 
			'0x5731': true, //Undying Flesh
			'0x571C': true, //Essence Of Control
			'0x572C': true, //Goblin Blood
			'0x571C': true, //Essence Of Passion
			'0x572D': true, //Lava Serpent Crust
			'0x3196': true, //white pearl
			'0x5721': true, //demon claw
		});
	} else {
		SetLootItems({
			'0x5747': true, //raptor teeth
			'0x400B': true, //shame crystals
			'0x0F87': true, // lucky coin
			//'0x226F': true, //wraith form
			//'0x2D51': true, //SW spell
			//'0x2D52': true, //SW spell
			//'0x2D53': true, //immolating weapon SW Spell
			//'0x2D54': true, //SW spell
			//'0x2D55': true, //SW Spell
			//'0x2D56': true, //SW Spell
			//'0x2D57': true, //SW Spell
			//'0x2D58': true, //SW Spell
			//'0x2D59': true, //SW Spell
			//'0x2D5A': true, //SW Spell
			//'0x2D5B': true, //SW Spell
			//'0x2D5C': true, //SW Spell
			//'0x2D5D': true, //SW Spell
			//'0x2D5E': true, //word of death SW spell
			//'0x2D5F': true, //Gift Of Life SW spell
			//'0x2D60': true, //Gift Of Life SW spell
			'0x573E': true, //void Orion
			'0x5728': true, //void core
			'0x0E21': true, //bandages
			'0x0F80': true, // demon bone
			'0x0EED': true, // gold
			
			'0x0F3F': true, //arrows
			'0x1BD1': true, // feathers
			
			'0x571C': true, // essence achivement
			'0x5744': true, //SS skin 
			'0x5731': true, //Undying Flesh
			'0x571C': true, //Essence Of Control
			'0x572C': true, //Goblin Blood
			'0x571C': true, //Essence Of Passion
			'0x572D': true, //Lava Serpent Crust
			'0x26B7': true, //zoogi
		});
	
	}
	
	
	//constants
	
	var timeBetweenBows = 300000; // time in ms between bows (ensure keep logged in)
	var agilityPotionBuffIcon = '0x753c';
	var strPotionBuffIcon = '0x7567';
	var disarmBuffIcon = '0x754a';
	var agilityPotionType = '0x0F08';
	var strPotionType = '0x0F09';
	var poisonBuffIcon = '0x7560';
	var curePotionType = '0x0F07';
	var healPotionType = '0x0F0C';
	SetLootBagType('0x0E79');
	
	
	var EnhancementPots = function(){
		if(useEnhancementPots){
			if(Orion.FindType(agilityPotionType).length > 0 && !Orion.BuffExists(agilityPotionBuffIcon)){
				WaitForObjectTimeout();
				if(Orion.FindType(agilityPotionType).length > 0 && !Orion.BuffExists(agilityPotionBuffIcon)){
					Orion.UseType(agilityPotionType);
				}
				RegisterUseObjectTimeout()
			}
			if(Orion.FindType(strPotionType).length > 0 && !Orion.BuffExists(strPotionBuffIcon)){
				WaitForObjectTimeout();
				if(Orion.FindType(strPotionType).length > 0 && !Orion.BuffExists(strPotionBuffIcon)){
					Orion.UseType(strPotionType);
					RegisterUseObjectTimeout()
				}
			}
		}
	}
	
	var RestorePotions = function(){
		if(useRestorePotions){
			if(Orion.FindType(curePotionType).length > 0 && Orion.BuffExists(poisonBuffIcon)){
				WaitForObjectTimeout();
				if(Orion.FindType(curePotionType).length > 0 && Orion.BuffExists(poisonBuffIcon)){
					Orion.UseType(curePotionType);
					RegisterUseObjectTimeout()
				}
			}
			if(Orion.FindType(healPotionType).length > 0 && Player.Hits() < healPotionThreshold && !Orion.BuffExists(poisonBuffIcon)){
				WaitForObjectTimeout();
				if(Orion.FindType(healPotionType).length > 0 && Player.Hits() < healPotionThreshold && !Orion.BuffExists(poisonBuffIcon)){
					Orion.UseType(healPotionType);
					RegisterUseObjectTimeout()
				}
			}
			if(Orion.FindType(curePotionType).length > 0 && Orion.BuffExists(poisonBuffIcon)){
				 RestorePotions();
			}
		}
	}
	
	var recoveredCorpse = false;

	var RecoverCorpse = function(){
		if(!recoveredCorpse){
			recoveredCorpse = true;
			var playerName = Player.Name();
			var corpses = Orion.FindType(any, any, ground, "inlos", 2);
				 if (!corpses.length)
			    {
			        return;
			    }
			
			corpses.forEach(function(corpseId){
				var corpseObject =  Orion.FindObject(corpseId);
				if(!corpseObject) return;
				var props = corpseObject.Properties();
				if(props.indexOf(playerName) > -1 && corpseId !== Player.Serial()){
					Orion.Print("CORPSE FOUND");
					Orion.UseObject(corpseId);
				
				}
			})
		}
		
		  
	}
	var monsterNamesToIgnore = [
		"(summoned)",
		"(tame)",
		"(bonded)",
		"spectral armor",
		"Spectral Armor",
	];
	var redNamesToIgnore = [
		'banshee',
		'bone knight',
		'lich',
		'skeletal dragon',
		'flesh ripper',
		'a mummy',
		'a revenant'
	];
	
	
	
	var ValidEnemysWithinTiles = function(dist, firstOnly){
		var typesToIgnore = {
			'0x0190': true, //human male
			'0x0191': true, //human female
			'0x025D': true, //elf male
			'0x025E': true, //elf female
			'0x029A': true, //garg male
			'0x029B': true, //garg Female
			'0x02E8': true, //vamp male,
			'0x02E9': true, //vamp female
			'0x02EB': true, //writh female
			'0x02EC': true, //wraith male	
			
			'0x00D9': true, //animal form dog
			'0x09C4': true, //tiger form
		}
		var playerSerial = Player.Serial();
		var enemyIds = [];
		var enemy = Orion.FindType("any", "any", "ground", "live|ignoreself|inlos", dist, enemyTypes);	
		if(enemy && enemy.length > 0){	
			enemy.forEach(function(enemyId){
				if(firstOnly && enemyIds.length > 0) return;
				if(playerSerial === enemyId) return;
				var enemyObject = Orion.FindObject(enemyId);
				if(enemyObject){
					var props = enemyObject.Properties().toLowerCase();
					if(!props || props.length === 0) return;
					if(	enemyObject.Notoriety() === 6 &&
							redNamesToIgnore.filter(function(name){
								return props.indexOf(name.toLowerCase()) > -1;
							}).length > 0 
						){
							 return;
						}
					if(	monsterNamesToIgnore.filter(function(name){
								return props.indexOf(name.toLowerCase()) > -1;
							}).length > 0 
						) {
							 return;
						}
					if(!useSkipTypesToIgnore && 
					typesToIgnore[enemyObject.Graphic()] && 
					humanoidNamesToAttack.filter(function(name){
								return props.indexOf(name.toLowerCase()) > -1;
							}).length === 0
					)  {
							 return;
						}
					enemyIds.push(enemyId);
				}
				else {
					enemyIds.push(enemyId);
					return;
				}	
			})						
		}
		return enemyIds;
	}
	
	var GetTarget = function(){
		var dist = 0;
		var enemies = [];
		while(dist < maxEnemyDistance){
			if(enemies.length > 0){
				dist = dist + 1;
				continue;
			} 
			dist = dist + 1;
			if(dist > 1 && dist !== maxEnemyDistance && dist % 2 === 1) continue;
			enemies = ValidEnemysWithinTiles(dist, true);		
		}
		return enemies.length > 0 ? enemies[0] : null;
	}
	
	
	var lastEnemyHonored = null;
	
	var AttackTarget = function(enemy){
		if(!enemy) return;
		 if(enemy){
			if(useHonor && (!lastEnemyHonored || lastEnemyHonored.toString() !== enemy.toString())){
				lastEnemyHonored = enemy;
				Orion.InvokeVirtue("Honor")
				Orion.WaitForTarget();
				Orion.TargetObject(enemy);
			}
	    	Orion.Attack(enemy);
	    	if(useRunToTarget){
	    		var enemyObject = Orion.FindObject(enemy);
	    		if(enemyObject && !Orion.GetGlobal('moving')){
	    			var destX = enemyObject.X();
	    			var destY = enemyObject.Y();
	    			if(moveToBoundry.miny && destY < moveToBoundry.miny) destY = moveToBoundry.miny;
	    			if(moveToBoundry.maxy && destY > moveToBoundry.maxy) destY = moveToBoundry.maxy;
	    			if(moveToBoundry.minx && destX < moveToBoundry.minx) destX = moveToBoundry.minx;
	    			if(moveToBoundry.maxx && destX > moveToBoundry.maxx) destX = moveToBoundry.maxx;
	    			Orion.WalkTo(destX, destY, 1, MinDistToTarget, 255, 1, 1,  500);
	    		}
		    	
	    	}
	    	
	    }
	}
	
	var nextSpellTime = 0;
	var SetNextSpellTime = function(delay){
		nextSpellTime = new Date().getTime() + delay;
	}
	var CanUseAnotherSpell = function(){
		var now = new Date().getTime();
		return now > nextSpellTime;
	}
	var CastSpells = function(){
		if(CanUseAnotherSpell() && Player.Mana() > minimumManaForSpells) {
	    	if(useEnemyOfOne && !Orion.BuffExists('0x754e')){
	    		Orion.Cast('Enemy of One');
	    		SetNextSpellTime(2000)
	    		//Orion.Wait(500) //handle fcr
	    	} else if(useDivineFury && !Orion.BuffExists('0x754d')){
	    		Orion.Cast('Divine Fury');
	    		SetNextSpellTime(2000);
	    		//Orion.Wait(500) //handle fcr
	    	} else if(useConsecrateWeapon && !Orion.BuffExists('0x75a7')){
	    		Orion.Cast('Consecrate Weapon');
	    		SetNextSpellTime(1500);
	    		//Orion.Wait(500) //handle fcr
	    	}    
	    }
	}
	
	
	var lastMonsterCheck = null;
	var lastMonsterCheckMultiple = false;
	var UseSpecials = function(){
		if(Player.Mana() > 20) {
			if(useDeathStrike && !Orion.BuffExists('0x75fb')){
		    	Orion.Cast('Death Strike');
		    	Orion.Wait(2250);  //there is a delay between using the skill and seeing the buff
	    	}
	    	if(useMomentumStrike && useLightningStrike){
	    		var enemies = [];
					var shouldCheckMonsters = true;
					if((Orion.BuffExists('0x75fb') || Orion.BuffExists('0x75fb'))){
						if(!(lastMonsterCheck == null || lastMonsterCheck + 1000 <  new Date().getTime())){
							shouldCheckMonsters = false;
							if(lastMonsterCheckMultiple !== null){
								enemies.push({});
								if(lastMonsterCheckMultiple){
									enemies.push({});
								}
							}
						}
					} else {
						if(!(lastMonsterCheck == null || lastMonsterCheck + 500 <  new Date().getTime())){
							shouldCheckMonsters = false;
							if(lastMonsterCheckMultiple !== null){
								enemies.push({});
								if(lastMonsterCheckMultiple){
									enemies.push({});
								}
							}
						}
					}
					
					if(shouldCheckMonsters){
						enemies = ValidEnemysWithinTiles(2);
						lastMonsterCheck = new Date().getTime();
						lastMonsterCheckMultiple = enemies.length === 0 ? null : enemies.length === 1 ? false : true;
					}
					
					if(enemies.length > 1){
						if(!Orion.BuffExists('0x75fb')){
							Orion.Cast('Momentum Strike');
			    			Orion.Wait(250);  //there is a delay between using the skill and seeing the buff
						}
						return;
					} else {
						if(!Orion.BuffExists('0x75fa')){
							Orion.Cast('Lightning Strike');
			    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
						}
						return;
					}
	    	} else {
		    	if(useMomentumStrike && !Orion.BuffExists('0x75fb')){
			    	Orion.Cast('Momentum Strike');
			    	Orion.Wait(250);  //there is a delay between using the skill and seeing the buff
		    	}
		    	if(useLightningStrike && !Orion.BuffExists('0x75fa')){
			    	Orion.Cast('Lightning Strike');
			    	Orion.Wait(250); //there is a delay between using the skill and seeing the buff
		    	}
	    	}
	    	
	    	if(useSpecial){
	    		var weaponObject = Orion.ObjAtLayer('RightHand');
				if(!weaponObject) weaponObject = Orion.ObjAtLayer('LeftHand');
				if(!weaponObject) return;
				var props = weaponObject.Properties();
				
				if(props.indexOf('Double Axe') > -1){
								
					
					var enemies = [];
					var shouldCheckMonsters = true;
					if((Orion.AbilityStatus('Secondary') || Orion.AbilityStatus('Primary'))){
						if(!(lastMonsterCheck == null || lastMonsterCheck + 1000 <  new Date().getTime())){
							shouldCheckMonsters = false;
							if(lastMonsterCheckMultiple !== null){
								enemies.push({});
								if(lastMonsterCheckMultiple){
									enemies.push({});
								}
							}
						}
					} else {
						if(!(lastMonsterCheck == null || lastMonsterCheck + 500 <  new Date().getTime())){
							shouldCheckMonsters = false;
							if(lastMonsterCheckMultiple !== null){
								enemies.push({});
								if(lastMonsterCheckMultiple){
									enemies.push({});
								}
							}
						}
					}
					
					if(shouldCheckMonsters){
						enemies = ValidEnemysWithinTiles(2);
						lastMonsterCheck = new Date().getTime();
						lastMonsterCheckMultiple = enemies.length === 0 ? null : enemies.length === 1 ? false : true;
					}
					
					if(enemies.length > 1){
						if(!Orion.AbilityStatus('Secondary')){
							Orion.UseAbility('Secondary');
			    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
						}
						return;
					} else {
						if(!Orion.AbilityStatus('Primary')){
							Orion.UseAbility('Primary');
			    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
						}
						return;
					}
				}
				
				
				
				if(primaryArmorIgnoreWeapons.filter(function(weapon){
						return props.indexOf(weapon) > -1;
					}).length > 0){
					if(!Orion.AbilityStatus('Primary')){
						Orion.UseAbility('Primary');
		    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
					}
					return;
				}
				
				if(secondaryArmorIgnoreWeapons.filter(function(weapon){
						return props.indexOf(weapon) > -1;
					}).length > 0){
					if(!Orion.AbilityStatus('Secondary')){
						Orion.UseAbility('Secondary');
		    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
					}
					return;
				}
				
				if(primaryWhirlwindWeapon.filter(function(weapon){
						return props.indexOf(weapon) > -1;
					}).length > 0){
					if(!Orion.AbilityStatus('Primary')){
						Orion.UseAbility('Primary');
		    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
					}
					return;
				}
				
	    		if(secondaryWhirlwindWeapon.filter(function(weapon){
						return props.indexOf(weapon) > -1;
					}).length > 0){
					if(!Orion.AbilityStatus('Secondary')){
						Orion.UseAbility('Secondary');
		    			Orion.Wait(250); //there is a delay between using the skill and seeing the buff
					}
					return;
				}
	    	}    
	    }
	}
	
	var bowCounter = 0;
	
	var Bow = function(){
		if(bowCounter > timeBetweenBows / timeBetweenLoops){
	        bowCounter = 0;
	        Orion.EmoteAction('bow');
	    }
	}
	
	var insurableText = [
		"Of Fey Wrath",
		"Of The Archlich"
	];
	function CheckBackpackUninsuredItems(){
			var itemsInBag = Orion.FindType('any', 'any', 'backpack');
			itemsInBag.forEach(function(itemId){
				var itemObject = Orion.FindObject(itemId);
				if(!itemObject) return;
				var props = itemObject.Properties();
				if(props.indexOf("Insured") > -1) {
					return;
				}
				if(props.indexOf("Blessed") > -1) {
					return;
				}
				if(insurableText.filter(function(text){
					return props.indexOf(text) > -1;
				}).length > 0){
					InsureItem(itemId);
				}
			})
	}	
	
	var Rearm = function(){
	
		var weaponObject = Orion.ObjAtLayer('RightHand');
		if(weaponObject && weaponObject.Properties().toLowerCase().indexOf("skill requ") === -1) weaponObject = null;
		if(!weaponObject) weaponObject = Orion.ObjAtLayer('LeftHand');
		if(weaponObject && weaponObject.Properties().toLowerCase().indexOf("skill requ") === -1) weaponObject = null;
		if(!weaponObject) {
			if( !Orion.BuffExists(disarmBuffIcon)){
				Orion.CreateClientMacro('EquipLastWeapon').Play(false, 1000);
			}
			
		};
	}

	var checkUninsuredCounter = 0;
	var lastIgnoreResetTime = null;
	while(!Player.Dead()){
		
		if(useRearm) Rearm();
		RecoverCorpse();
	    Bow();
	   	if(useAttack) AttackTarget(GetTarget());
	   	if(useHealFriend) HealFriend(WaitForObjectTimeout, RegisterUseObjectTimeout);
		if(useBandages) UseBandages(WaitForObjectTimeout, RegisterUseObjectTimeout);
		if(useChivHeal) ChivHeal();
		
		if(useHealPets) HealPets(WaitForObjectTimeout, RegisterUseObjectTimeout);
		if(useHealChivFriend) HealChivFriend();
		if(useConfidence) UseConfidence();
		if(useEvasion) UseEvasion();
		EnhancementPots();
		RestorePotions();
		CastSpells();
		UseSpecials();
	    if(useLootCorpses)  LootCorpses(WaitForObjectTimeout, RegisterUseObjectTimeout, ShouldKeepItem);
	    if(checkUninsuredCounter > 200){
	    	if(useIgnoreReset && (!lastIgnoreResetTime || lastIgnoreResetTime + 180000 <  new Date().getTime())){
				Orion.IgnoreReset();
				Orion.Print("Resetting Ignore");
				lastIgnoreResetTime = new Date().getTime();	
			}
	    	CheckBackpackUninsuredItems();
	    	checkUninsuredCounter = 0;
	    } else{
	    	checkUninsuredCounter = checkUninsuredCounter + 1;
	    }
	    
	    Orion.Wait(timeBetweenLoops);
	}
}

