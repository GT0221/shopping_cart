import { importImages } from './helpers';
import '../styles/Home.css';

const logos = importImages(
    require.context('../images/logos', false, /\.(png|jpe?g|svg)$/)
);
const companyWebsites = {
    sony: 'https://www.playstation.com/en-us/',
    nintendo: 'https://www.nintendo.com/',
    microsoft: 'https://www.xbox.com/en-US',
};

function Home() {
    return (
        <div className="home-page">
            <h1>Welcome to Consoles-r-Us</h1>
            <p>
                At Consoles-r-Us we currently sell video game consoles from
                Microsoft, Nintendo and Sony. In the future we will be adding
                vintage consoles dating all the way back to Atari 2600.
            </p>
            <h3 style={{ textAlign: 'center' }}>
                Click on a company logo below to visit their official website
            </h3>
            <div className="company-links">
                {Object.keys(logos).map((key) => {
                    return (
                        <div key={`company-${key}`}>
                            <a href={companyWebsites[key.replace('.svg', '')]}>
                                <img src={logos[key].default} alt="" />
                            </a>
                            <h2>{`${key.charAt(0).toUpperCase()}${key
                                .replace('.svg', '')
                                .substring(1)}`}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
