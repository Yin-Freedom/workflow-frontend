FROM dhub.kubesre.xyz/nginx:1.12.2-alpine
ADD ROOT.tar.gz /usr/share/nginx/html
ADD root.conf /etc/nginx
CMD ["nginx", "-g", "daemon off;"]