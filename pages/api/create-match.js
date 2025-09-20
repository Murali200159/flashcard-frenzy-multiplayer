export default function handler(req, res) {
  if (req.method === 'POST') {
    const { roomCode } = req.body;
    console.log('🎲 Game created:', roomCode);
    res.status(201).json({ 
      success: true, 
      roomCode: roomCode || 'ABC123',
      message: 'Game room created successfully'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}