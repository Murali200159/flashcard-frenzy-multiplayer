export default function handler(req, res) {
  if (req.method === 'POST') {
    const { roomCode, userId } = req.body;
    console.log('🚪 Player joined:', userId, 'in room:', roomCode);
    res.status(200).json({ 
      success: true, 
      roomCode, 
      userId,
      message: 'Joined game successfully'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}