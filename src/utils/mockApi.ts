export const mockLogin = (username: string, password: string): Promise<{ token: string; userInfo: { username: string; role: string } }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                resolve({
                    token: 'fake-jwt-token',
                    userInfo: {
                        username: 'admin',
                        role: 'admin'
                    }
                });
            } else {
                reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng!'));
            }
        }, 1000);
    });
};
