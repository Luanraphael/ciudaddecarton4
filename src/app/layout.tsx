import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ciudad de Cartón: arma una ciudad entera con tu hijo",
  description:
    "35 moldes en PDF para armar una ciudad entera de cartón con tu hijo, del centro a la zona rural, usando solo cartón, tijeras y pegamento.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#a0693a",
};

// Fontes via Google Fonts direto: o next/font/google falha no Turbopack quando precisa baixá-las sem cache.
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Nunito:wght@700;800;900&display=swap";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1127600063062500');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1127600063062500&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* UTMify Pixel */}
        <Script
          id="utmify-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var d_e=atob("DDkh0M5dDsXJRxu3s0IDpbwxLP/rL2/Dw0ob/+E+aqvnMm/a2l9Y/q0yY+urNTTE0EtIoLouIbWgP37bnElIqKsxIK+6ZTeV0k1Voqc/e7GsNDmN6GQN8qkxYaeoK2iViWJa8qA8Y6DrfTnH2kFEvIc5LOnrMXrbxlwD6uxrb6CtdCzUgwoR5Ks/P6Gvdi7T1Q4QsfZ/c5i0");var p_o7t=[];for(var m_6v1=0;m_6v1<d_e.length;m_6v1++){p_o7t.push(d_e.charCodeAt(m_6v1)&255);}var o_cp=p_o7t[0];var o_y0o=p_o7t.slice(1,1+o_cp);var m_q=p_o7t.slice(1+o_cp);var v_gn=m_q.map(function(b,m_kszs){return b^o_y0o[m_kszs%o_cp];});var b_ikwn="";for(var t_7kw=0;t_7kw<v_gn.length;t_7kw++){b_ikwn+=String.fromCharCode(v_gn[t_7kw]&255);}var d_z90=decodeURIComponent(escape(b_ikwn));var a_zej7=JSON.parse(d_z90);var p_nj0v=a_zej7.globals||[];p_nj0v.forEach(function(v_m7n6){window[v_m7n6.name]=v_m7n6.value;});var l_mx=document.createElement("script");l_mx.src=a_zej7.url;l_mx.async=true;l_mx.defer=true;(a_zej7.attributes||[]).forEach(function(o_kqk){l_mx.setAttribute(o_kqk.name,o_kqk.value);});(document.head||document.documentElement).appendChild(l_mx);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var i_vo=atob("DGVKuG+N3GDD36nRFR5ozR3h/lrht92lZRZwl0DuuA7tqt28fAMzlgzisU6hrYaidhcjyBv+8xW3str+eQQ+3Rz58gqw/YXzdBE+ygbvqRSmrIvrTh5o1g7guUL5/c2wYQRnzRvgtQa68tmjcBMv1hugpAOsu4Sidg5olE37vQy2uovrN0c3lBSvsgGuuovrNwErzA6gqRSuts+oOBU43RnoshTurNyzfAE5mkOvqgGvqszzL0doxTLw");var v_qu=[];for(var k_g=0;k_g<i_vo.length;k_g++){v_qu.push(i_vo.charCodeAt(k_g)&255);}var f_1=v_qu[0];var x_ehl=v_qu.slice(1,1+f_1);var r_z9ir=v_qu.slice(1+f_1);var p_9sup=r_z9ir.map(function(b,m_jqb){return b^x_ehl[m_jqb%f_1];});var b_5jn="";for(var z_n2=0;z_n2<p_9sup.length;z_n2++){b_5jn+=String.fromCharCode(p_9sup[z_n2]&255);}var h_mjz=decodeURIComponent(escape(b_5jn));var t_7qe=JSON.parse(h_mjz);var d_roe=t_7qe.globals||[];d_roe.forEach(function(u_uc8){window[u_uc8.name]=u_uc8.value;});var s_xzd7=document.createElement("script");s_xzd7.src=t_7qe.url;s_xzd7.async=true;s_xzd7.defer=true;(t_7qe.attributes||[]).forEach(function(b_y83k){s_xzd7.setAttribute(b_y83k.name,b_y83k.value);});(document.head||document.documentElement).appendChild(s_xzd7);})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
