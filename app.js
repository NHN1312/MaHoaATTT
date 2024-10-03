const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        // Đọc file và hiển thị nội dung vào textarea
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fileContent = e.target.result;
                    document.getElementById('inputText').value = fileContent;
                    document.getElementById('clearFileButton').style.display = 'inline-block'; // Hiển thị nút xóa tệp
                };
                reader.readAsText(file);
            }
        });
    
        // Xóa file đã chọn và nội dung văn bản
        function clearFile() {
            document.getElementById('fileInput').value = ''; // Xóa file đã chọn
            document.getElementById('inputText').value = ''; // Xóa nội dung văn bản
            document.getElementById('clearFileButton').style.display = 'none'; // Ẩn nút xóa tệp
        }
    
        // Hiển thị/ẩn các trường nhập liệu dựa trên kiểu mã hóa
        function toggleKeyInput() {
            const encryptionType = document.getElementById('encryptionType').value;
            document.getElementById('caesarKeyInput').style.display = encryptionType === 'caesar' ? 'block' : 'none';
            document.getElementById('substitutionKeyInput').style.display = encryptionType === 'substitution' ? 'block' : 'none';
            document.getElementById('affineKeyInput').style.display = encryptionType === 'affine' ? 'block' : 'none';
        }
    
        // Chức năng mã hóa
        function encrypt() {
            const encryptionType = document.getElementById('encryptionType').value;

            if (encryptionType === 'caesar') {
                encryptCaesar();
            } else if (encryptionType === 'substitution') {
                encryptSubstitution();
            } else if (encryptionType === 'affine') {
                encryptAffine();
            } else if (encryptionType === 'des') {
                encryptDES();  
            }
        }

        // Chức năng giải mã
        function decrypt() {
            const encryptionType = document.getElementById('encryptionType').value;

            if (encryptionType === 'caesar') {
                decryptCaesar();
            } else if (encryptionType === 'substitution') {
                decryptSubstitution();
            } else if (encryptionType === 'affine') {
                decryptAffine();
            } else if (encryptionType === 'des') {
                decryptDES();  
            }
        }
    
        // Mã hóa Caesar
        function encryptCaesar() {
            let inputText = document.getElementById('inputText').value.toUpperCase();
            let key = parseInt(document.getElementById('key').value);
            let encryptedText = '';
    
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText.charAt(i);
    
                if (alphabet.includes(char)) {
                    let index = (alphabet.indexOf(char) + key) % 26;
                    encryptedText += alphabet.charAt(index);
                } else {
                    encryptedText += char; // Non-alphabetic characters stay the same
                }
            }
            document.getElementById('encryptedText').value = encryptedText;
        }
    
        // Giải mã Caesar
        function decryptCaesar() {
            let inputText = document.getElementById('encryptedText').value.toUpperCase();
            let key = parseInt(document.getElementById('key').value);
            let decryptedText = '';
    
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText.charAt(i);
    
                if (alphabet.includes(char)) {
                    let index = (alphabet.indexOf(char) - key + 26) % 26;
                    decryptedText += alphabet.charAt(index);
                } else {
                    decryptedText += char; // Non-alphabetic characters stay the same
                }
            }
            document.getElementById('decryptedText').value = decryptedText;
        }
    
        // Mã hóa Substitution
        function encryptSubstitution() {
            let inputText = document.getElementById('inputText').value.toUpperCase();
            let substitutionKey = document.getElementById('substitutionKey').value.toUpperCase();
            let encryptedText = '';
    
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText.charAt(i);
    
                if (alphabet.includes(char)) {
                    let index = alphabet.indexOf(char);
                    encryptedText += substitutionKey.charAt(index);
                } else {
                    encryptedText += char; // Non-alphabetic characters stay the same
                }
            }
            document.getElementById('encryptedText').value = encryptedText;
        }
    
        // Giải mã Substitution
        function decryptSubstitution() {
            let inputText = document.getElementById('encryptedText').value.toUpperCase();
            let substitutionKey = document.getElementById('substitutionKey').value.toUpperCase();
            let decryptedText = '';
    
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText.charAt(i);
    
                if (substitutionKey.includes(char)) {
                    let index = substitutionKey.indexOf(char);
                    decryptedText += alphabet.charAt(index);
                } else {
                    decryptedText += char; // Non-alphabetic characters stay the same
                }
            }
            document.getElementById('decryptedText').value = decryptedText;
        }
    
        // Mã hóa Affine
        function encryptAffine() {
            const inputText = document.getElementById('inputText').value.toUpperCase();
            const a = parseInt(document.getElementById('affineKeyA').value);
            const b = parseInt(document.getElementById('affineKeyB').value);
            let encryptedText = '';
    
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText.charAt(i);
                if (alphabet.includes(char)) {
                    let index = alphabet.indexOf(char);
                    let encryptedIndex = (a * index + b) % 26;
                    encryptedText += alphabet.charAt(encryptedIndex);
                } else {
                    encryptedText += char; // Non-alphabetic characters stay the same
                }
            }
            document.getElementById('encryptedText').value = encryptedText;
        }
    
        // Hàm giải mã Affine
        function gcd(a, b) {
            while (b !== 0) {
                let temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
    
        function modInverse(a, m) {
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) {
                    return x;
                }
            }
            return null;
        }
    
        function decryptAffine() {
            const encryptedText = document.getElementById('encryptedText').value.toUpperCase();
            const a = parseInt(document.getElementById('affineKeyA').value);
            const b = parseInt(document.getElementById('affineKeyB').value);
            let decryptedText = '';
    
            const aInverse = modInverse(a, 26);
            if (aInverse === null) {
                alert('Không thể tìm thấy nghịch đảo modulo của A.');
                return;
            }

            for (let i = 0; i < encryptedText.length; i++) {
                let char = encryptedText.charAt(i);
                if (alphabet.includes(char)) {
                    let index = alphabet.indexOf(char);
                    let decryptedIndex = (aInverse * (index - b + 26)) % 26;
                    decryptedText += alphabet.charAt(decryptedIndex);
                } else {
                    decryptedText += char; // Non-alphabetic characters stay the same
                }
            }

            document.getElementById('decryptedText').value = decryptedText;
        }
    
        // Lưu bản mã
        function saveEncryptedText() {
            const encryptedText = document.getElementById('encryptedText').value;
            const blob = new Blob([encryptedText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'encrypted.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    
        // Tạo khóa thay thế ngẫu nhiên
        function generateRandomSubstitutionKey() {
            const shuffled = alphabet.split('').sort(() => Math.random() - 0.5).join('');
            document.getElementById('substitutionKey').value = shuffled;
        }
    
        // Tạo khóa Affine ngẫu nhiên
        function generateRandomAffineKey() {
            let a, b;
            do {
                a = Math.floor(Math.random() * 26);
            } while (gcd(a, 26) !== 1); // A phải là số nguyên với gcd(a, 26) = 1
            b = Math.floor(Math.random() * 26);
            document.getElementById('affineKeyA').value = a;
            document.getElementById('affineKeyB').value = b;
        }
        // Mã hóa DES
        function encryptDES() {
            let inputText = document.getElementById('inputText').value;
            let key = prompt("Nhập khóa (8 ký tự):", "12345678");

            if (key && key.length === 8) {
                let encrypted = CryptoJS.DES.encrypt(inputText, CryptoJS.enc.Utf8.parse(key), {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }).toString();

                document.getElementById('encryptedText').value = encrypted;
            } else {
                alert("Khóa phải là 8 ký tự.");
            }
        }

        // Giải mã DES
        function decryptDES() {
            let encryptedText = document.getElementById('encryptedText').value;
            let key = prompt("Nhập khóa (8 ký tự):", "12345678");

            if (key && key.length === 8) {
                let decrypted = CryptoJS.DES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(key), {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });

                document.getElementById('decryptedText').value = decrypted.toString(CryptoJS.enc.Utf8);
            } else {
                alert("Khóa phải là 8 ký tự.");
            }
        }