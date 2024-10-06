import React from 'react';

const Contact = () => {
    return (
        <footer style={styles.footer}>
            <div id='contact' style={styles.container}>
                <div style={styles.infoSection}>
                    <h2>Contact Us</h2>
                    <p>123 Mumbai, Suite 456</p>
                    <p>Email: <a href="mailto:support@agnirakshak.com">support@agnirakshak.com</a></p>
                    <p>Phone: <a href="tel:+91 9137570589">+91 9137570589</a></p>
                </div>
                <div style={styles.socialMedia}>
                    <h2>Follow Us</h2>
                    <div style={styles.socialLinks}>
                        <a href="https://facebook.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://linkedin.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div style={styles.navigation}>
                    <h2>Quick Links</h2>
                    <ul style={styles.navList}>
                        <li><a href="/Home.js">Home</a></li>
                        <li><a href="/report">Report Incident</a></li>
                        <li><a href="/noc">NOC Application</a></li>
                        <li><a href="/fire-drill">Book a Fire-Drill</a></li>
                        <li><a href="/resources">Resources</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div style={styles.footerBottom}>
                <p>&copy; 2024 Agni Rakshak. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 20px',
        fontSize: '14px',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    infoSection: {
        flex: '1',
        minWidth: '200px',
        marginRight: '20px',
    },
    socialMedia: {
        flex: '1',
        minWidth: '200px',
        marginRight: '20px',
    },
    socialLinks: {
        display: 'flex',
        flexDirection: 'column',
    },
    socialLink: {
        color: '#fff',
        textDecoration: 'none',
        marginBottom: '10px',
        fontSize: '14px',
    },
    navigation: {
        flex: '1',
        minWidth: '200px',
    },
    navList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    footerBottom: {
        marginTop: '20px',
        borderTop: '1px solid #444',
        paddingTop: '10px',
    },
};

export default Contact;
