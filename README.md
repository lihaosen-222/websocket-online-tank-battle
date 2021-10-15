# GAME-LastOne

客户端项目结构：
	index
		init 各种初始化
		coreTimer
			玩家方法
			socket函数
			子弹方法
			被击中后停止
			
	socket：
		接收sign-in：
			登入是占用名字，随机出生坐标
		接收sign-out：
			若没被击中则删除player对应数据
		接收all：
			遍历更新player，如果是新的数据创建新的player，自己以外的player会添加DOM
			
	object
		mouse：
			init和key的值
			
		key：
			init和key的值
		
		bullet：
			send：发送子弹的初始数据
			createRegister：
				注册监听，接收到消息，再数组中创建
			move：
				遍历，控制子弹移动和碰撞，
				若自己的子弹击中玩家，则发送shotdown
		
		player
			otherMove：排除thisPlayer的数据，更新到dom上
			thisPlayer
				setangle
				move：接近鼠标时停止和撞墙判断
				dash
				send
action：按键控制行为

客户端数组
  玩家数组：
    thisPlayer单独处理，加入了自己的方法，发送移动数据什么的
    player数组根据服务器数据创建并更新，新数据会创建DOM，但如果名字和thisPlayer重合则不创建
    
    子弹碰撞需要遍历完整的player数组
    

  子弹数据
    send并不会再本地创建子弹，而是将数据发送到服务器，传后本地后渲染出子弹

    遍历判断，击中后删除
    击中判断忽略发射者

服务器数组 
  playerArr，signin时设置名字，名字是player的核心，遍历时会检查name
  根据客户端的数据更新，20ms发送回去一次

  shotedArr。被射击后会删除数据，断开连接后也会删除数据，两次删除会带来bug，用该数组避开重复删除



    

