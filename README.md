# websocket-online-tank-battle
## 展示
http://81.68.226.188:8007/

## 服务器
对局消息中转、击杀、延迟

## 客户端
### 我方坦克渲染：setInterval 循环渲染
### 敌方坦克渲染：socket.on 渲染
### 游戏对象(GameObj)：
属性：位置、宽高、角度等
方法：create、render、destory 等
		
### 我方坦克对象(myTank)：维护子弹队列

## 难点1：
碰撞，简化为方块
对象碰撞：GameObj.isCollided(obj1, obj2) 静态方法
地图碰撞：GameMap.prototype.isCollided(xPos, yPos)

## 难点2:
设计
GameObj 维护自己的状态，每次循环生成 myTank 的状态给服务器，根据服务器返回的 GameState 更新各个 GameObj 的状态

## gameState
```
{
	"cOGovBDRMs9YuAsQAAAF": {
		"tank": {
			"xPos": 423.7183547981496,
			"yPos": 513.631550843396,
			"direction": -0.9913250935910298
		},
		"bullets": []
	}
	...
}
```


    

