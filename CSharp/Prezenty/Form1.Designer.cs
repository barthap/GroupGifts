namespace Prezenty
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.osobyList = new System.Windows.Forms.ListBox();
            this.sumaLabel = new System.Windows.Forms.Label();
            this.iloscOsobLabel = new System.Windows.Forms.Label();
            this.hajsNaOsobeLabel = new System.Windows.Forms.Label();
            this.wynikiBox = new System.Windows.Forms.TextBox();
            this.buttonAdd = new System.Windows.Forms.Button();
            this.buttonEdit = new System.Windows.Forms.Button();
            this.buttonDelete = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.nameBox = new System.Windows.Forms.TextBox();
            this.valueBox = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // osobyList
            // 
            this.osobyList.AllowDrop = true;
            this.osobyList.FormattingEnabled = true;
            this.osobyList.Location = new System.Drawing.Point(12, 12);
            this.osobyList.Name = "osobyList";
            this.osobyList.Size = new System.Drawing.Size(194, 394);
            this.osobyList.TabIndex = 0;
            this.osobyList.SelectedIndexChanged += new System.EventHandler(this.osobyList_SelectedIndexChanged);
            this.osobyList.DragDrop += new System.Windows.Forms.DragEventHandler(this.listBox_DragDrop);
            this.osobyList.DragOver += new System.Windows.Forms.DragEventHandler(this.listBox_DragOver);
            this.osobyList.MouseDown += new System.Windows.Forms.MouseEventHandler(this.listBox_MouseDown);
            // 
            // sumaLabel
            // 
            this.sumaLabel.AutoSize = true;
            this.sumaLabel.Location = new System.Drawing.Point(12, 433);
            this.sumaLabel.Name = "sumaLabel";
            this.sumaLabel.Size = new System.Drawing.Size(34, 13);
            this.sumaLabel.TabIndex = 1;
            this.sumaLabel.Text = "Suma";
            // 
            // iloscOsobLabel
            // 
            this.iloscOsobLabel.AutoSize = true;
            this.iloscOsobLabel.Location = new System.Drawing.Point(12, 420);
            this.iloscOsobLabel.Name = "iloscOsobLabel";
            this.iloscOsobLabel.Size = new System.Drawing.Size(63, 13);
            this.iloscOsobLabel.TabIndex = 2;
            this.iloscOsobLabel.Text = "LiczbaOsob";
            // 
            // hajsNaOsobeLabel
            // 
            this.hajsNaOsobeLabel.AutoSize = true;
            this.hajsNaOsobeLabel.Location = new System.Drawing.Point(12, 446);
            this.hajsNaOsobeLabel.Name = "hajsNaOsobeLabel";
            this.hajsNaOsobeLabel.Size = new System.Drawing.Size(38, 13);
            this.hajsNaOsobeLabel.TabIndex = 3;
            this.hajsNaOsobeLabel.Text = "zł / os";
            // 
            // wynikiBox
            // 
            this.wynikiBox.Location = new System.Drawing.Point(226, 154);
            this.wynikiBox.Multiline = true;
            this.wynikiBox.Name = "wynikiBox";
            this.wynikiBox.Size = new System.Drawing.Size(344, 305);
            this.wynikiBox.TabIndex = 4;
            // 
            // buttonAdd
            // 
            this.buttonAdd.Location = new System.Drawing.Point(226, 26);
            this.buttonAdd.Name = "buttonAdd";
            this.buttonAdd.Size = new System.Drawing.Size(75, 23);
            this.buttonAdd.TabIndex = 5;
            this.buttonAdd.Text = "Dodaj";
            this.buttonAdd.UseVisualStyleBackColor = true;
            this.buttonAdd.Click += new System.EventHandler(this.buttonAdd_Click);
            // 
            // buttonEdit
            // 
            this.buttonEdit.Location = new System.Drawing.Point(226, 55);
            this.buttonEdit.Name = "buttonEdit";
            this.buttonEdit.Size = new System.Drawing.Size(75, 23);
            this.buttonEdit.TabIndex = 6;
            this.buttonEdit.Text = "Edytuj";
            this.buttonEdit.UseVisualStyleBackColor = true;
            this.buttonEdit.Click += new System.EventHandler(this.buttonEdit_Click);
            // 
            // buttonDelete
            // 
            this.buttonDelete.Location = new System.Drawing.Point(226, 84);
            this.buttonDelete.Name = "buttonDelete";
            this.buttonDelete.Size = new System.Drawing.Size(75, 23);
            this.buttonDelete.TabIndex = 7;
            this.buttonDelete.Text = "Usuń";
            this.buttonDelete.UseVisualStyleBackColor = true;
            this.buttonDelete.Click += new System.EventHandler(this.buttonDelete_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(226, 7);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(40, 13);
            this.label1.TabIndex = 8;
            this.label1.Text = "Osoby:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(324, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(26, 13);
            this.label2.TabIndex = 9;
            this.label2.Text = "Imie";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(324, 65);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(56, 13);
            this.label3.TabIndex = 10;
            this.label3.Text = "Ile zaplacil";
            // 
            // nameBox
            // 
            this.nameBox.Location = new System.Drawing.Point(390, 28);
            this.nameBox.Name = "nameBox";
            this.nameBox.Size = new System.Drawing.Size(180, 20);
            this.nameBox.TabIndex = 11;
            // 
            // valueBox
            // 
            this.valueBox.Location = new System.Drawing.Point(390, 62);
            this.valueBox.MaxLength = 10;
            this.valueBox.Name = "valueBox";
            this.valueBox.Size = new System.Drawing.Size(70, 20);
            this.valueBox.TabIndex = 12;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(467, 65);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(16, 13);
            this.label4.TabIndex = 13;
            this.label4.Text = "zł";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(226, 135);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(42, 13);
            this.label5.TabIndex = 14;
            this.label5.Text = "Wyniki:";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(592, 471);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.valueBox);
            this.Controls.Add(this.nameBox);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.buttonDelete);
            this.Controls.Add(this.buttonEdit);
            this.Controls.Add(this.buttonAdd);
            this.Controls.Add(this.wynikiBox);
            this.Controls.Add(this.hajsNaOsobeLabel);
            this.Controls.Add(this.iloscOsobLabel);
            this.Controls.Add(this.sumaLabel);
            this.Controls.Add(this.osobyList);
            this.Name = "Form1";
            this.Text = "Skladanie sie na prezenty";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox osobyList;
        private System.Windows.Forms.Label sumaLabel;
        private System.Windows.Forms.Label iloscOsobLabel;
        private System.Windows.Forms.Label hajsNaOsobeLabel;
        private System.Windows.Forms.TextBox wynikiBox;
        private System.Windows.Forms.Button buttonAdd;
        private System.Windows.Forms.Button buttonEdit;
        private System.Windows.Forms.Button buttonDelete;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox nameBox;
        private System.Windows.Forms.TextBox valueBox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
    }
}

