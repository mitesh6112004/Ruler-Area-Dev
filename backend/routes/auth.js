router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Optional: hash password (REMOVE this line if you want plaintext)
    // const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({
        name,
        email,
        password, // store directly (plaintext)
        role
      });
  
      await user.save();
      res.status(201).json({ message: 'User created', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).send('User not found');
    }
  
    if (user.password !== password) {
      return res.status(401).send('Incorrect password');
    }
  
    // Optional: set session or token here
  
    res.redirect('/home.html'); // 👈 Redirect to home page
  });
  