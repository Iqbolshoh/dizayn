@@ .. @@
 import Dashboard from './pages/Dashboard';
 import Editor from './pages/Editor';
 import Preview from './pages/Preview';
+import TemplateGallery from './pages/TemplateGallery';
 import Profile from './pages/Profile';
 import Billing from './pages/Billing';
 import Settings from './pages/Settings';
@@ .. @@
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/dashboard" element={<Dashboard />} />
+            <Route path="/templates" element={<TemplateGallery />} />
             <Route path="/editor/:id" element={<Editor />} />
             <Route path="/preview/:id" element={<Preview />} />
             <Route path="/profile" element={<Profile />} />