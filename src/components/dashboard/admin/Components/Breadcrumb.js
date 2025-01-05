export const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumbs text-sm text-accent mx-2">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.icon && <item.icon width={16} className="me-1" />}
            {item.link ? (
              <a href={item.link} className="hover:underline">
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
