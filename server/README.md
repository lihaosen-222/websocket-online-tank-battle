# 思路
- gameState = {}
- 有人时才开始，coreTimer
  - 状态群发：发送 gameState
- 初始进入：创建 gameState 对应条，检查 coreTimer
- 个人状态接收：修改 gameState 对应条（不存在时不给修改）
- 接受击中信息：删除 gameState 对应条，检查 coreTimer
- 退出：删除 gameState 对应条，检查 coreTimer
		
